<template>
  <div class="max-w-sm bg-gray-200 p-2 rounded overflow-hidden shadow mb-2">
    <div class="cursor-pointer"  @click="showCardModal=true">
      <p class="pb-2 text-gray-700">{{ card.card_text }}</p>
      <span class="bg-orange-300 px-1 rounded text-gray-600" v-if="card.due_date">{{ card.due_date }}</span>  
    </div>

    <CardModal v-if="showCardModal" @closeCardModal="showCardModal=false" :list_item="list_item" :card="card" />
  </div>
</template>

<script>
import CardModal from './CardModal'

export default {
  name: 'Card',
  props: ['card', 'list_item'],
  components: { CardModal },
  data () {
    return {
      showCardModal: false
    }
  },
  methods: {
    // 
  }
}
</script>