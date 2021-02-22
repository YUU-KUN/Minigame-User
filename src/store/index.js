import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('Authorization') || '',
  		user : {}
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token){
		    state.status = 'success'
		    state.token = token
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	},
	actions: {
		
	  	// login({commit}, admin){
	    //     return new Promise((resolve, reject) => {
	    //         commit('auth_request')
      //         const config = {
      //           headers: {
      //             "Content-Type": "application/x-www-form-urlencoded",
      //           },
      //         };
			//   const auth = {
			// 	auth: {
			// 		username: process.env.VUE_APP_BASIC_AUTH_USERNAME, 
			// 		password: process.env.VUE_APP_BASIC_AUTH_PASSWORD
			// 	}
			//   }
			//   axios.post('/admin/login', admin, auth) //shorthand
	    //         .then(response => {
			// 		const token = response.data.data.accessToken
	    //             commit('auth_success', token)
	    //             localStorage.setItem('Authorization', token)
	    //             axios.defaults.headers.common['Authorization'] = token
	    //             resolve(response)
	    //         })
	    //         .catch(err => {
			// 		if (err.response.data[0]) {
			// 			console.log(err.response.data[0].message)
			// 		} else {
			// 			console.log(err.response)
			// 		}
	    //             commit('auth_error')
	    //             localStorage.removeItem('Authorization')
	    //             reject(err)
	    //         })
	    //     })
	    // },

		//User
		login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
              const config = {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              };
			  const auth = {
				auth: {
					username: process.env.VUE_APP_BASIC_AUTH_USERNAME, 
					password: process.env.VUE_APP_BASIC_AUTH_PASSWORD
				}
			  }
			  axios.post('/user/login', user, auth) //shorthand
	            .then(response => {
					const token = response.data.data.accessToken
	                axios.defaults.headers.common['Authorization'] = token
	                localStorage.setItem('Authorization', token)
	                const logged = response.data
                  console.log(logged)
	                commit('auth_success', token)
					setTimeout(resolve(response), 3000)
	                resolve(response)
	            })
	            .catch(err => {
					if (err.response.data[0]) {
						console.log(err.response.data[0].message)
					} else {
						console.log(err.response)
					}
	                commit('auth_error')
	                localStorage.removeItem('Authorization')
	                reject(err)
	            })
	        })
	    },

	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/user/register', data: user, method: 'POST' })
	            .then(response => {
	                const token = response.data.data.accessToken
	                const logged = response.data.logged
	                localStorage.setItem('Authorization', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, logged)
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('Authorization')
	                reject(err)
	            })
	        })
	    },
      
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('Authorization')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},
	getters : {
	  isLoggedIn: state => !!state.token,
	  authStatus: state => state.status,
	}
})
