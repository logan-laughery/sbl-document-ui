<template>
  <div id="document-details">
    <router-link :to="{path: `/documents`}" class="back-link">
      &lt; Back
    </router-link>
    <div class="page-title">
      Document {{document.sbrId}}
    </div>
    <Card>
      <div class="form-title">
        Email Details
      </div>
      <ReadOnlyField
        field="Subject"
        :value="document.emailDetails.subject"
      />
      <ReadOnlyField
        field="From"
        :value="document.emailDetails.subject"
      />
      <ReadOnlyField
        field="To"
        :value="document.emailDetails.subject"
      />
      <ReadOnlyField
        field="Cc"
        :value="document.emailDetails.subject"
      />
      <ReadOnlyField
        field="Bcc"
        :value="document.emailDetails.subject"
      />
    </Card>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Card from '@/components/Shared/Card';
import ReadOnlyField from '@/components/Shared/ReadOnlyField';

export default {
  name: 'DocumentDetails',
  components: {
    Card,
    ReadOnlyField,
  },
  apollo: {
    document: {
      query: gql`query Document($where: DocumentWhereUniqueInput!) {
        document(where: $where) {
          id
          sbrId
          orRequestor
          emailDetails {
            subject
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
  },
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
  position: absolute;
  top: 86px;
}
</style>
