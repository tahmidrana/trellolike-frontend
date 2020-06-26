import { API_URL } from '../../config'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    boards: [],
    board: null,
    card_list: [],
    errors: []
  },

  getters: {
    allBoards: (state) => state.boards,
    boardData: (state) => state.board,
    cardList: (state) => state.card_list,
  },

  mutations: {
    LOAD_BOARDS(state, boards) {
      state.boards = boards
    },

    CREATE_BOARD(state, data) {
      state.boards.unshift(data)
    },

    LOAD_CARD_LIST(state) {
      state.card_list = state.board.card_list
    },

    GET_BOARD(state, board) {
      state.board = board
    },

    GET_CARD_LIST(state, board) {
      state.card_list = board.card_list
    },

    CREATE_CARD_LIST(state, data) {
      state.card_list.push(data)
    },

    CREATE_CARD(state, card) {
      state.card_list.forEach((element, index) => {
        if (card.card_list_id == element.id) {
          state.card_list[index].cards.push(card)
        }
      });
    },

    MOVE_CARD(state, card) {
      state.card_list.forEach((element, index) => {
        if (card.card_list_id == element.id) {
          state.card_list[index].cards.push(card)
        }

        if (card.prev_list_id == element.id) {
          let cards = state.card_list[index].cards.filter(item => item.id!=card.id)
          state.card_list[index].cards = cards
        }
      });
    },

    DELETE_CARD(state, card) {
      state.card_list.forEach((element, index) => {
        if (card.card_list_id == element.id) {
          let cards = state.board.card_list[index].cards.filter(item => item.id!=card.id)
          state.board.card_list[index].cards = cards
        }
      });
    },

    UPDATE_CARD(state, card) {
      state.card_list.forEach((element, index) => {
        if (card.card_list_id == element.id) {
          let cards = element.cards.map((item) => {
            if(item.id === card.id) {
              return card
            } else {
              return item
            }
          })
          state.board.card_list[index].cards = cards
        }
      })
    }
  },

  actions: {
    loadBoards({commit}) {
      axios.get(API_URL + '/boards').then(response => {
        commit('LOAD_BOARDS', response.data)
      })
    },
  
    createNewBoard({commit}, name, description) {
      axios.post(API_URL + '/boards', { name, description }).then(response => {
        commit('CREATE_BOARD', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
  
    getBoard({commit}, id) {
      axios.get(API_URL + '/boards/' + id).then(response => {
        commit('GET_BOARD', response.data)
        commit('GET_CARD_LIST', response.data)
      })
    },
  
    createNewCardList({commit}, data) {
      axios.post(API_URL + '/card-lists', data).then(response => {
        commit('CREATE_CARD_LIST', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
  
    createNewCard({ commit }, data) {
      axios.post(API_URL + `/cards?list_id=${data.card_list_id}`, data).then(response => {
        commit('CREATE_CARD', response.data)
      }).catch(err => {
        console.log(err)
      })
    },

    moveCard({ commit }, card) {
      axios.post(API_URL + `/cards/${card.id}/move`, {move_to_list_id: card.move_to_list_id}).then(response => {
        let data = response.data
        data.prev_list_id = card.card_list_id
        commit('MOVE_CARD', data)
      }).catch(err => {
        console.log(err)
      })
    },

    deleteCard ({ commit }, card) {
      axios.delete(API_URL + `/cards/${card.id}`).then(() => {
        commit('DELETE_CARD', card)
      }).catch(err => {
        console.log(err)
      })
    },
  
    updateCard({commit}, data) {
      axios.put(API_URL + `/cards/${data.card.id}`, {card_text: data.card_text, description: data.description}).then(response => {
        commit('UPDATE_CARD', response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
