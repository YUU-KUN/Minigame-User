<template>
<div class="container-fluid" style="margin-top:100px">
	<div class="row">
		<div class="col-md-12">
			<div class="card shadow mb-4">
				<div class="card-header py-3">
						<h6 class="m-0 font-weight-bold text-primary">Cart</h6>
				</div>
				<div class="progress" style="height: 5px;" v-if="loading">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
				<div class="row" v-if="!loading && userCart.items.length == 0" style="text-align:center">
					<div class="col">
						<img
							src="../../public/assets/icons/Astronaut-01.svg"
							class="card-img-top"
							alt="..."
							style="margin:auto; width: 300px"
						/>
						<div style="margin-bottom: 50px">
							<h1><strong>OH NO!</strong></h1>
							<p>You have no items yet <br />Let's change that!</p>
						</div>
					</div>
				</div>
		  
				<div class="card-body" v-if="!loading && userCart.items.length > 0">
					<div v-if="removed" class="alert alert-success alert-dismissible fade show" role="alert">
						<button type="button" @click="removed = false" class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="row">
						<div class="col-md-12 mt-3">
							<div class="table-responsive">
								<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
									<thead>
										<tr>
											<th>No.</th>
											<th>Members</th>
											<th>Play Date</th>
											<th>Price</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(cart, index) in userCart.items" :key="index">
											<td>
												<span class="d-flex justify-content-center">{{index+1}}</span>
											</td>
											<td>
												<span v-if="cart.members != ''">
													<span v-for="(member, index) in cart.members" :key="index"><li>{{member.name}}</li></span>
												</span>
												<span v-else>-</span>
											</td>
											<td>
												{{cart.playingDate | dateOnly}}
											</td>
											<td>
												{{cart.itemPrice | rupiah}}
											</td>
											<td>
												<button class="btn btn-danger" data-fancybox :data-src="'#'+index" title="Delete Item"><b-icon icon="trash2-fill"></b-icon></button>
											</td>

											<div style="display:none" :id="index" class="animated-modal">
												<h2>Watch Out!</h2>
												<p>Are you sure wanna delete this item?</p>
												<div class=" d-flex justify-content-center">
													<button type="button" data-fancybox-close class="btn btn-outline-secondary col-5" style="margin: 0 5px">Cancel</button>
													<button type="button" @click="deleteCart(index)" data-fancybox-close class="btn btn-danger col-5 " style="margin: 0 5px">YASHH!</button>
												</div>
											</div>

										</tr>
									</tbody>
								</table>

								<div class="d-flex justify-content-end" style="margin:10px 0">
									<b style="margin: 0 5px;">Total:</b>{{userCart.total | rupiah}}
								</div>
								<div class="d-flex">
									<div class="ml-auto p-0">
										<button type="submit" @click="checkOut" class="btn btn-success mb-4">
					                        <span v-if="loading" class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>						
											<span v-else>Checkout!</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<b-toast id="my-toast" :variant="toastVariant" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{toastTitle}}</strong>
          <small class="text-muted mr-2">{{countdown}} seconds ago</small>
        </div>
      </template>
      <b>{{toastMessage}}</b>
    </b-toast>
</div>
</template>

<script>
import moment from 'moment'
export default {
	data() {
		return {
			userCart: '',
			removed: false,
			cartId: '',
			cartItemId: '',

			//buat toastnya
      		count: moment(0),
      		toastTitle: '',
      		toastMessage: '',
      		toastVariant: '',

			loading: false,
		}
	},
	methods: {
		getCart() {
			this.loading = true
			this.axios.get('cart/user').then(response => {
				this.userCart = response.data.data
				this.cartId = response.data.data.cartId
				this.loading = false
			}).catch(error => {
				console.log(error.response)
				this.loading = false
				
			})
		},
		deleteCart(index) {
			this.count = moment(0)
			let headers = {
				"headers": {
						"content-type": "application/json",
				},
			}
			let itemId = this.userCart.items[index].itemId
			this.axios.put('/cart/remove/'+itemId, headers).then(response => {
				console.log(response)
				console.log('Berhasil Menghapus Dari Keranjang')
				this.getCart()

				// Buat Toast
        		this.toastVariant = 'warning'
        		this.toastTitle = 'Berhasil!'
        		this.toastMessage = response.data.message
        		this.$bvToast.show('my-toast')

			}).catch(error => {
				console.log(error);

				// Buat Toast
        		this.toastVariant = 'danger'
        		this.toastTitle = 'Terdapat Kesalahan!'
        		this.toastMessage = 'Kesalahan ketika menghapus item cart'
        		this.$bvToast.show('my-toast')
			})
		},
		checkOut() {
			this.loading = true
			let cartId = this.cartId
			console.log(cartId);
			this.axios.post('transaction/checkout', {
				cartId: cartId
				}).then(response => {
				this.loading = false
				console.log(response)
				console.log('Berhasil Checkout Keranjang!')
				
				// Buat Toast
        		this.toastVariant = 'success'
        		this.toastTitle = 'Berhasil!'
        		this.toastMessage = response.data.message
        		this.$bvToast.show('my-toast')
				setTimeout(() => {
					this.$router.push('/transaction')
				}, 2000);
			}).catch(error => {
				this.loading = false
				console.log(error.response);

				// Buat Toast
        		this.toastVariant = 'danger'
        		this.toastTitle = 'Terdapat Kesalahan!'
        		this.toastMessage = error.response.data.message
        		this.$bvToast.show('my-toast')
			})
		},
			
	},
	computed: {
        countdown(){
            return this.count.format('s');
        }
    },
  	mounted() {
  	  	var timer = setInterval(() => {
  	  	    this.count = moment(this.count.add(1, 'seconds'));
  	  	    if(this.count.diff(moment(0)) === 10){
  	  	      	clearInterval(timer);
  	  	    }
  	  	}, 1000);

		this.getCart()
  	},
}
</script>

<style>
</style>