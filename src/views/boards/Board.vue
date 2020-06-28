<template>
  <div class="relative">
    <div class="flex item-center">
      <h3 class="text-xl font-bold" v-if="board">{{ board.name }}</h3>
    </div>

    <div class="flex flex-wrap" v-if="loading">
      <div class="max-w-sm h-24 rounded bg-white mr-4 w-300px mb-4" v-for="x in 5" :key="x">
        <div class="px-6 py-4">
          <div class="w-4/6 bg-gray-200 block h-4 mb-4"></div>
          <div class="w-full bg-gray-200 block h-2 mb-2"></div>
          <div class="w-full bg-gray-200 block h-2 mb-2"></div>
        </div>
      </div>
    </div>
    
    <div class="my-2 card-list flex flex-no-wrap overflow-x-auto" v-else >
      <CardListItem v-for="list_item in card_list" :key="list_item.id" :list_item="list_item" />

      <button v-if="!showBoardCreateForm" @click="showBoardCreateForm=true" class="w-250px h-full rounded bg-teal-500 hover:bg-teal-400 text-white flex-none text-center">
          <div class="px-2 py-2">Add new list</div>
      </button>

      <div class="w-300px h-full flex-none bg-white rounded mr-4 mb-4" v-if="showBoardCreateForm">
        <div class="px-2 py-1">
            <form @submit.prevent="createNewList">
              <input type="text" v-model="list_title" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="List Title" autofocus required />
              <input type="submit" class="text-white text-base bg-green-400 hover:bg-green-500 rounded px-2 py-1 my-1 cursor-pointer" value="Create" />
              <button class="text-white rounded text-base bg-red-500 hover:bg-red-600 px-2 py-1 mx-1 my-1" @click="showBoardCreateForm=false">Cancel</button>
            </form>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardListItem from '@/components/cards/CardListItem.vue'

export default {
  name: 'Board',
  components: {
    CardListItem
  },
  data () {
    return {
      loading: true,
      showBoardCreateForm: false,
      list_title: ''
    }
  },
  computed: {
    ...mapGetters({
      board: 'board/boardData',
      card_list: 'board/cardList',
    })
  },
  methods: {
    ...mapActions({ getBoard: 'board/getBoard', createNewCardList: 'board/createNewCardList' }),
    createNewList () {
      if (this.list_title.length) {
        this.createNewCardList({ board_id : this.board.id, title : this.list_title }).then(() => {
          this.showBoardCreateForm = false
          this.list_title = ''
        })
      }
    }
  },
  created() {
    this.getBoard(this.$route.params.id).then(() => this.loading = false)
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ddd; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ccc; 
}
</style>