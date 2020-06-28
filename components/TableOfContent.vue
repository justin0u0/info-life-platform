<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'TableOfContent',
  props: {
    contentData: {
      type: Object,
      required: true,
    },
  },
  // data() {
  //   return {
      
  //   };
  // },
  mounted() {
    this.fetchHeadingType();
  },
  methods: {
    fetchHeadingType() {
      console.log(this.contentObj.content.filter((datum) => datum.type === 'heading'));
    },
    
  },
};
</script>

<style scoped>
</style>
