<template>
  <div class="mt-4 mx-md-5 px-md-5">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="信箱">
        <el-input v-model="form.name" class="pr-md-5"></el-input>
      </el-form-item>
      <el-form-item label="想法">
        <el-input v-model="form.desc" type="textarea" class="pr-md-5"></el-input>
      </el-form-item>
      <el-form-item class="pr-5">
        <el-button type="info" class="mr-5" @click="onSubmit">送出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        mail: '',
        desc: '',
      },
    };
  },
  methods: {
    onSubmit() {
      // TODO: handleSubmit
      console.log('submit!');
    },
  },
};
</script>

<style scoped>

</style>
