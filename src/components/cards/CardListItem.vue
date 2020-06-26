<template>
  <div class="w-300px h-full flex-none bg-white rounded mr-4 mb-4">
    <div class="px-2 py-1">
        <div class="font-bold text-lg mb-2">{{ list_item.title }}</div>
        <Card v-for="card in list_item.cards" :key="card.id" :card="card" :list_item="list_item" />

        <button @click="showForm=true" v-if="!showForm" class="text-gray-700 text-base bg-gray-100 hover:bg-gray-200 w-full p-2">Add new card</button>

        <form @submit.prevent="addNewCard" v-if="showForm">
          <textarea v-model="card_text" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Card Title" autofocus required></textarea>
          <input type="submit" class="text-white text-base bg-green-400 hover:bg-green-500 rounded px-2 py-1 my-1 cursor-pointer" value="Create" />
          <button class="text-white rounded text-base bg-red-500 hover:bg-red-600 px-2 py-1 mx-1 my-1" @click="showForm=false">Cancel</button>
        </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Card from '@/components/cards/Card.vue'
export default {
  name: 'CardListItem',
  props: ['list_item'],
  data () {
    return {
      showForm: false,
      card_text: ''
    }
  },
  components: {
    Card
  },
  methods: {
    ...mapActions({ createNewCard : 'board/createNewCard' }),
    addNewCard () {
      if (this.card_text.length) {
        this.createNewCard({ card_text: this.card_text, card_list_id: this.list_item.id }).then(() => {
          this.showForm = false
          this.card_text = ''
        })
      }
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
}
</script>

<style scoped>

</style>