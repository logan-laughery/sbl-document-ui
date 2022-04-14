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
                  <ReadOnlyField
                    field="Drive ID"
                    :value="document.driveId"
                  />
                </Card>
              </v-col>
              <v-col cols="12">
                <Card>
                  <div class="form-title">
                    Attributes
                  </div>
                  <ChipSelector
                    field="Categories"
                    inputTitle="Category"
                    title="Add Category"
                    color="#E8EDFF"
                    :options="[]"
                    :chips="['test']"
                    @remove="removeCategory"
                    @add="addCategory"
                  />
                  <ChipSelector
                    field="Personnel"
                    inputTitle="Personnel"
                    title="Add Personnel"
                    color="#FDEAD8"
                    :options="[]"
                    :chips="['test']"
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
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                      />
                    </div>
                  </div>
                </Card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <PdfViewer
              :file="document.documentContent.file"
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
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Card from '@/components/Shared/Card';
import PdfViewer from '@/components/DocumentDetails/PdfViewer';
import ChipSelector from '@/components/DocumentDetails/ChipSelector';
import ReadOnlyField from '@/components/Shared/ReadOnlyField';

export default {
  name: 'DocumentDetails',
  components: {
    Card,
    ReadOnlyField,
    PdfViewer,
    ChipSelector
  },
  apollo: {
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
            name
          }
          personnel {
            firstName
            lastName
            email
          }
          orRequestDate
          fileName
          driveId
          documentContent {
            text
            file
          }
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
    // addDocumentTopic: {
    //   query: gql`mutation UpdateDocument($data: DocumentUpdateInput!, $where: DocumentWhereUniqueInput!) {
    //     updateDocument(data: $data, where: $where) {
    //       topics {
    //         name
    //       }
    //     }
    //   }}`,
    //   variables() {
    //     // Use vue reactive properties here
    //     return {
    //       where: {
    //         id: this.$route.params.id,
    //       },
    //       data: {
    //         topics: {
    //               "connectOrCreate": [
    //                 {
    //                   "create": {
    //                     "name": null
    //                   },
    //                   "where": {
    //                     "name": null
    //                   }
    //                 }
    //               ],
    //       }
    //     }
    //   },
    // },
  },
  methods: {
    addCategory(event) {
      console.error(event);
    },
    removeCategory(event) {
      console.error(event);
    },
    addPersonnel(event) {
      console.error(event);
    },
    removePersonnel(event) {
      console.error(event);
    }
  }
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
