<template>
  <div id="document-details">
    <router-link :to="{path: `/documents`}" class="back-link">
      &lt; Back
    </router-link>
    <div v-if="!$apollo.queries.document.loading">
      <div class="page-title">
        Document {{document.sbrId}}
      </div>
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
      <Card>
        <div class="form-title">
          Document
        </div>
        <PdfViewer :file="document.documentContent.file"/>
      </Card>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Card from '@/components/Shared/Card';
import PdfViewer from '@/components/DocumentDetails/PdfViewer';
import ReadOnlyField from '@/components/Shared/ReadOnlyField';

export default {
  name: 'DocumentDetails',
  components: {
    Card,
    ReadOnlyField,
    PdfViewer
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
      }
    },
  }
};
</script>

<style>
.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #000000;
}

.page-title {
  margin-bottom: 30px;
}

.back-link {
  text-decoration: none;
  position: static;
  top: 86px;
}
</style>
