<template>
  <div class="home content-wrapper">
    <div v-for="document in documents" :key="document.meta.id">
      <router-link :to="`/documentation/${document.fields.slug}`">
        <article>
          <div class="image">
            <img :alt="document.fields.title" :src="`${document.fields.image[0].fields.file.url}?w=840&h=400&fit=crop`">
          </div>
          <h2>{{ document.fields.title }}</h2>
        </article>
      </router-link>
    </div>
    <button v-if="totalDocuments > documents.length" @click="getDocuments">
      {{loading ? 'Loading...' : 'Load more documents'}}
    </button>
  </div>
</template>

<script>
  import { comfortable } from '@/comfortable.js'

  export default {
    name: 'home',
    data() {
      return {
        documents: [],
        totalDocuments: 0,
        loading: false
      }
    },
    methods: {
      getDocuments() {
        this.loading = true;

        const options = {
          embedAssets: true,
          offset: this.documents.length
        };

        comfortable.getCollection('documentation', options)
        .then(result => {
          this.documents.push(...result.data);
          this.totalDocuments = result.meta.total;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          throw err;
        })
      }
    },
    created() {
      this.getDocuments();
    }
  }
</script>

<style>
  article {
    margin-bottom: 42px;
    text-align: left;
  }

  article .image {
    width: 100%;
  }

  article .image img {
    max-width: 100%;
    height: auto;
  }

  article h2 {
    color: #2d2d33;
  }

  .home article {
    border: 1px solid #ccc;
  }

  .home article h2 {
    margin-left: 21px;
  }
</style>