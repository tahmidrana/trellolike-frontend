<template>
  <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container bg-gray-100">
            <div class="mmodal-header pb-4">
                <slot name="header">
                    <div class="font-bold text-lg mb-2" @click="showEditCardText =! showEditCardText">{{ card.card_text }} <span class="text-sm text-gray-600">in list <span class="underline">{{ list_item.title }}</span></span> </div>
                </slot>
            </div>

            <div class="modal-body">
                <slot name="body">
                  <div class="flex mb-4">
                    <div class="w-3/4">
                      <form @submit.prevent="updateCardAction">
                        <input type="text" v-model="card_text" class="bg-gray-300 w-full px-3 py-2 outline-none focus:shadow-outline focus:bg-blue-100 rounded" v-if="showEditCardText">
                        <p class="font-bold text-gray-700 pb-2">Description</p>
                        <textarea v-model="description" cols="30" rows="3" class="bg-gray-300 w-full px-3 py-2 outline-none focus:shadow-outline focus:bg-blue-100 rounded"></textarea>
                        <button type="submit" class="text-white rounded text-base bg-green-500 hover:bg-red-600 px-4 py-2 float-right">Update</button>
                      </form>
                    </div>
                    <div class="w-1/4 ml-2">
                      <p class="font-bold text-gray-700 pb-2">Actions</p>

                      <button class="text-left py-1 px-4 bg-gray-200 rounded mb-2 w-full hover:bg-gray-300 text-gray-700">Due Date</button>
                      <button class="text-left py-1 px-4 bg-gray-200 rounded mb-2 w-full hover:bg-gray-300 text-gray-700">Members</button>
                      <button @click="showMoveTo =! showMoveTo" class="text-left py-1 px-4 bg-gray-200 rounded mb-2 w-full hover:bg-gray-300 text-gray-700">Move</button>
                      <div id="move-area" class="ml-4 mb-2 rounded" v-if="showMoveTo">
                        <button v-for="item in board.card_list" :key="item.id" @click="moveCardAction(item.id)" class="text-left py-1 px-4 bg-gray-400 rounded mb-1 w-full hover:bg-gray-500 text-gray-700">{{ item.title }}<span v-if="item.id==list_item.id" class="text-orange-600"> *</span></button>
                      </div>

                      <button class="text-left py-1 px-4 bg-gray-200 rounded mb-2 w-full hover:bg-gray-300 text-gray-700" @click="deleteCardAction">Delete</button>
                    </div>
                  </div>
                </slot>
            </div>

            <div class="modal-footer clearfix">
                <slot name="footer">
                  <button class="modal-default-button bg-red-600 text-white font-bold text-sm rounded px-2 py-2 uppercase mr-1" @click="$emit('closeCardModal')">Close</button>
                </slot>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardModal',
  props: ['card', 'list_item'],
  data () {
    return {
      showMoveTo: false,
      showEditCardText: false,
      card_text: this.card.card_text,
      description: this.card.description,
      due_date: this.card.due_date,
    }
  },

  computed: {
    ...mapGetters({
      board: 'board/boardData'
    })
  },

  methods: {
    ...mapActions({ moveCard: 'board/moveCard', deleteCard: 'board/deleteCard', updateCard: 'board/updateCard' }),

    moveCardAction(move_to_list_id) {
      if(this.card.card_list_id !== move_to_list_id) {
        this.card.move_to_list_id = move_to_list_id
        this.moveCard(this.card)
      }
    },

    deleteCardAction () {
      if (confirm("Do you really want to delete this card?")) {
        this.deleteCard(this.card)
      }
    },

    updateCardAction () {
      if (this.card_text.length) {
        let data = { card: this.card, card_text: this.card_text, description: this.description }
        this.updateCard(data)
      }
    }
  }
}
</script>


<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
}

.modal-container {
  width: 820px;
  margin: 50px auto;
  padding: 15px 15px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.mmodal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.mmodal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  margin-left: 6px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>