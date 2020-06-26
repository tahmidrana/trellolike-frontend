<template>
  <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="mmodal-header pb-4">
                <slot name="header">
                    <h5 class="text-lg font-bold">Create Board</h5>
                </slot>
            </div>

            <div class="modal-body">
                <slot name="body">
                  <form @submit.prevent="createNewBoardSubmit">
                    <div class="mb-2">
                      <input v-model="board_name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Board Title" required/>
                    </div>
                    <textarea v-model="description" placeholder="Description" rows="2" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"></textarea>
                    <!-- <select v-model="team_id" class="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                      <option value="">No Team</option>
                    </select> -->
                    <button type="submit" class="bg-gray-700 text-white font-bold text-sm rounded px-2 py-2 uppercase float-right">Create</button>
                  </form>
                </slot>
            </div>

            <div class="modal-footer clearfix">
                <slot name="footer">
                  <button class="modal-default-button bg-red-600 text-white font-bold text-sm rounded px-2 py-2 uppercase mr-1" @click="$emit('closeBoardCreateModal')">Close</button>
                </slot>
            </div>
          </div>
        </div>
    </div>
  </transition>
  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateBoardModal',
  data () {
    return {
      board_name: '',
      description: '',
      team_id: null
    }
  },
  methods: {
    ...mapActions({ createNewBoard: 'board/createNewBoard' }),
    createNewBoardSubmit () {
      if (this.board_name.length) {
        this.createNewBoard(this.board_name, this.description).then(() => {
          this.$emit('closeModal')
        })
      }
    }
  },
  created() {
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
  width: 400px;
  margin: 50px auto;
  padding: 15px 15px;
  background-color: #fff;
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