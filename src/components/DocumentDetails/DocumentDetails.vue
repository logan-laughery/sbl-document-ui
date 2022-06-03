<template>
  <div id="document-details">
    <router-link :to="{path: `/documents`}" class="back-link">
      &lt; Back
    </router-link>
    <div v-if="!$apollo.queries.document.loading && document">
      <div class="page-title">
        Document {{document.sbrId}}
      </div>
      <div class="cards">
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <Card v-if="document.emailDetails">
                  <div class="form-title">
                    Email Details
                  </div>
                  <ReadOnlyField
                    field="Subject"
                    :value="document.sbrId"
                  />
                  <ReadOnlyField
                    field="From"
                    :value="document.sbrId"
                  />
                  <ReadOnlyField
                    field="To"
                    :value="document.sbrId"
                  />
                  <ReadOnlyField
                    field="Cc"
                    :value="document.sbrId"
                  />
                  <ReadOnlyField
                    field="Bcc"
                    :value="document.sbrId"
                  />
                </Card>
                <Card>
                  <div class="form-title">
                    Document Details
                  </div>
                  <ReadOnlyField
                    field="File Name"
                    :value="document.fileName"
                  />
                  <ReadOnlyField
                    field="Requested By"
                    :value="document.orRequestor"
                  />
                  <ReadOnlyField
                    field="Requested Date"
                    :value="document.orRequestDate"
                  />
                  <div class="field-container">
                    Drive ID
                    <div class="field-value" v-if="document.driveId">
                      <a target="_blank" :href="document.driveId">{{document.driveFilePath}}</a>
                    </div>
                    <div class="field-value" v-else>
                      {{document.driveFilePath}}
                    </div>
                  </div>
                </Card>
              </v-col>
              <v-col cols="12">
                <Card>
                  <div class="form-title">
                    Attributes
                  </div>
                  <TopicSelector
                    field="Topics"
                    inputTitle="Topic"
                    title="Add Topic"
                    color="#E8EDFF"
                    :options="topics.map(({name}) => name)"
                    :chips="document.topics.map(({name, id}) => ({text: name, id}))"
                    @remove="removeTopic"
                    @add="addTopic"
                  />
                  <PersonnelSelector
                    field="Personnel"
                    inputTitle="Personnel"
                    title="Add Personnel"
                    color="#FDEAD8"
                    :options="personnel"
                    :chips="document.personnel.map(({firstName, lastName, id}) => ({text: `${firstName} ${lastName}`, id}))"
                    @remove="removePersonnel"
                    @add="addPersonnel"
                  />
                  <div class="field-container">
                    Summary
                    <div class="field-value">
                      <v-textarea
                        class="sbr-text-area"
                        color="black"
                        label="Summarize Document"
                        single-line
                        auto-grow
                        rows="1"
                        :value="document.summary"
                        @input="debouncedSumaryUpdate"
                      />
                    </div>
                  </div>
                </Card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <PdfViewer
              :file="file"
              :fileName="document.fileName"
              :downloadPath="'/api/documentFile/' + documentId"
            />
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else class="loader">
      <v-progress-circular
        :size="50"
        color="black"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-snackbar
      v-model="snackbar"
      color="red accent-1"
      rounded="pill"
    >
      Request failed.  Please try again.
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Card from '@/components/Shared/Card';
import PdfViewer from '@/components/DocumentDetails/PdfViewer';
import TopicSelector from '@/components/DocumentDetails/TopicSelector';
import PersonnelSelector from '@/components/DocumentDetails/PersonnelSelector';
import ReadOnlyField from '@/components/Shared/ReadOnlyField';

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export default {
  name: 'DocumentDetails',
  components: {
    Card,
    ReadOnlyField,
    PdfViewer,
    TopicSelector,
    PersonnelSelector
  },
  data: () => ({
    snackbar: false,
    file: null
  }),
  apollo: {
    personnel: {
      query: gql`query Query($by: [PersonnelScalarFieldEnum!]!) {
        groupByPersonnel(by: $by) {
          _min {
            id
            firstName
            lastName
            email
          }
        }
      }`,
      variables() {
        return {
          by: ["email", "firstName", "lastName"]
        }
      },
      update: data => data.groupByPersonnel.map(({_min}) => _min)
    },
    topics: {
      query: gql`query Query($by: [TopicScalarFieldEnum!]!) {
        groupByTopic(by: $by) {
          id
          name
        }
      }`,
      variables() {
        return {
          by: ["id", "name"]
        }
      },
      update: data => data.groupByTopic
    },
    document: {
      query: gql`query Document($where: DocumentWhereUniqueInput!) {
        document(where: $where) {
          id
          sbrId
          orRequestor
          emailDetails {
            id
          }
          summary
          relevanceScore
          topics {
            id
            name
          }
          personnel {
            id
            firstName
            lastName
            email
          }
          orRequestDate
          fileName
          driveId
          driveFilePath
          beginDate
          endDate
        }
      }`,
      variables() {
        // Use vue reactive properties here
        return {
          where: {
            id: this.$route.params.id,
          }
        }
      },
      fetchPolicy: 'no-cache'
    },
  },
  computed: {
    documentId() {
      return this.$route.params.id;
    }
  },
  watch: {
    documentId: {
      immediate: true,
      async handler(newDocumentId) {
        this.file = `https://www.open-records-database.save-bloody-run.com/api/documentFile/${newDocumentId}`;
      }
    }
  },
  methods: {
    async safeMutation(args) {
      try {
        await this.$apollo.mutate(args)
      } catch (err) {
        this.snackbar = true;
      }
    },
    async addTopic(topicName) {
      await this.safeMutation({
        mutation: gql`mutation UpdateDocument($data: DocumentUpdateInput!, $where: DocumentWhereUniqueInput!) {
          updateDocument(data: $data, where: $where) {
            topics {
              name
              id
            }
          }
        }`,
        variables: {
          where: {
            id: this.document.id
          },
          data: {
            topics: {
              connectOrCreate: [
                {
                  create: {
                    name: topicName
                  },
                  where: {
                    name: topicName
                  }
                }
              ]
            }
          }
        },
        update: (store, { data: { updateDocument } }) => {
          this.document.topics = updateDocument.topics;
        },
      });
    },
    async removeTopic(event) {
      await this.safeMutation({
        mutation: gql`mutation UpdateDocument($data: DocumentUpdateInput!, $where: DocumentWhereUniqueInput!) {
          updateDocument(data: $data, where: $where) {
            topics {
              name
              id
            }
          }
        }`,
        variables: {
          where: {
            id: this.document.id
          },
          data: {
            topics: {
              disconnect: [
                {
                  id: event.id
                }
              ]
            }
          }
        },
        update: (store, { data: { updateDocument } }) => {
          this.document.topics = updateDocument.topics;
        },
      });
    },
    async addPersonnel(event) {
      console.error(event);
      const connectOrCreate = event.id ? 
        {
          connect: [
            {
              id: event.id
            }
          ]
        } :
        {
          create: [
            {
              lastName: event.lastName,
              firstName: event.firstName,
              email: event.email
            }
          ]
        };

      await this.safeMutation({
        mutation: gql`mutation UpdateDocument($data: DocumentUpdateInput!, $where: DocumentWhereUniqueInput!) {
          updateDocument(data: $data, where: $where) {
            personnel {
              id
              firstName
              lastName
              email
            }
          }
        }`,
        variables: {
          where: {
            id: this.document.id
          },
          data: {
            personnel: {
              ...connectOrCreate
            }
          }
        },
        update: (store, { data: { updateDocument } }) => {
          this.document.personnel = updateDocument.personnel;
        },
      });
    },
    async removePersonnel(event) {
      await this.safeMutation({
        mutation: gql`mutation UpdateDocument($data: DocumentUpdateInput!, $where: DocumentWhereUniqueInput!) {
          updateDocument(data: $data, where: $where) {
            personnel {
              id
              firstName
              lastName
              email
            }
          }
        }`,
        variables: {
          where: {
            id: this.document.id
          },
          data: {
            personnel: {
              disconnect: [{
                id: event.id
              }]
            }
          }
        },
        update: (store, { data: { updateDocument } }) => {
          this.document.personnel = updateDocument.personnel;
        },
      });
    },
    async updateSummary(summary) {
      await this.safeMutation({
        mutation: gql`mutation UpdateDocument($data: DocumentUpdateInput!, $where: DocumentWhereUniqueInput!) {
          updateDocument(data: $data, where: $where) {
            summary
          }
        }`,
        variables: {
          where: {
            id: this.document.id
          },
          data: {
            summary: {
              set: summary
            }
          }
        },
      });
    }
  },
  created() {
    this.debouncedSumaryUpdate = debounce((newValue, oldValue) => {
      this.updateSummary(newValue);
    }, 1000);
  },
  beforeUnmount() {
    this.debouncedSumaryUpdate.cancel();
  },
};
</script>

<style>
.cards {
  display: flex;
  flex-wrap: wrap;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #000000;
}

.page-title {
  margin-bottom: 17px;
}

.back-link {
  text-decoration: none;
  position: static;
  top: 86px;
  font-size: 13px;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.sbr-text-area {
  padding-top: 0px;
  margin-top: 0px;
}

.sbr-text-area textarea {
  line-height: 1.5;
}
</style>
