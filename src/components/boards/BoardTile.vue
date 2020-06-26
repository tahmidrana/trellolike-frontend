<template>
  <div class="max-w-sm h-24 rounded overflow-hidden bg-white hover:bg-gray-100 mr-4 w-250px mb-4">
    <div class="px-6 py-4">
      <router-link :to="{ name: 'board', params: { id: board.id } }" class="font-bold text-xl mb-2">{{ board.name }}</router-link>
    </div>
    <!-- <div class="px-6 py-4">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'BoardTile',
  props: ['board']
}
</script>

<style>

</style>