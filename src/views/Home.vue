<template>
  <div class="">
    <h3 class="text-xl font-bold">Boards</h3>
    <div class="flex flex-wrap" v-if="loading">
      <div class="max-w-sm h-24 rounded overflow-hidden bg-white hover:bg-gray-100 mr-4 w-250px mb-4" v-for="x in 7" :key="x">
        <div class="px-6 py-4">
          <div class="w-4/6 bg-gray-200 block h-4 mb-4"></div>
          <div class="w-full bg-gray-200 block h-2 mb-2"></div>
          <div class="w-full bg-gray-200 block h-2 mb-2"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap" v-else>
      <BoardTile v-for="board in boards" :key="board.id" :board="board" />

      <button @click="showBoardCreateModal=true" class="w-250px h-full rounded bg-teal-500 hover:bg-teal-400 text-white flex-none text-center">
        <div class="px-2 py-2">Add New Board</div>
      </button>
    </div>
    <CreateBoardModal v-if="showBoardCreateModal" @closeBoardCreateModal="showBoardCreateModal = false" @closeModal="showBoardCreateModal=false" />
  </div>
  
</template>

<script>
// @ is an alias to /src
import BoardTile from '@/components/boards/BoardTile.vue'
import CreateBoardModal from '@/components/boards/CreateBoardModal.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      loading: true,
      showBoardCreateModal: false
    }
  },
  components: {
    BoardTile,
    CreateBoardModal
  },
  computed: {
    ...mapGetters({
      boards: 'board/allBoards'
    })
  },
  methods: {
    ...mapActions({ loadBoards: 'board/loadBoards' })
  },
  created() {
    this.loadBoards().then(() => this.loading = false)
  }
}
</script>
