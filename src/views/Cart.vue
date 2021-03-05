<template>
<div class="container-fluid" style="margin-top:100px">
	<div class="row">
		<div class="col-md-12">
			<div class="card shadow mb-4">
				<div class="card-header py-3">
						<h6 class="m-0 font-weight-bold text-primary">Keranjang Anda</h6>
				</div>
				<div class="card-body">
					<div v-if="removed" class="alert alert-success alert-dismissible fade show" role="alert">
						{{info}} 
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
											<!-- <th>Items</th> -->
											<th>Members</th>
											<th>Play Date</th>
											<th>Price</th>
											<!-- <th>Created At</th> -->
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(cart, index) in userCart.items" :key="index">
											<td>
												<span class="d-flex justify-content-center">{{index+1}}</span>
											</td>
											<!-- <td>
												{{cart.cartGameData.title}}
											</td> -->
											<td>
												<span v-if="cart.members != ''">
													<span v-for="(member, index) in cart.members" :key="index"><li>{{member.name}}</li></span>
												</span>
												<span v-else>-</span>
											</td>
											<td>
												{{cart.playingDate | formatDate}}
											</td>
											<td>
												{{cart.itemPrice | rupiah}}
											</td>
											<!-- <td>
												{{cart.createdAt | formatDate}}
											</td> -->
											<td class="d-flex justify-content-center">
												<button class="btn btn-danger" data-fancybox :data-src="'#'+index" title="Delete Item"><b-icon icon="trash2-fill"></b-icon></button>
											</td>

											<div style="display:none" :id="index" class="animated-modal">
												<h2>Watch Out!</h2>
												<p>Are you sure wanna delete this item?</p>
												<!-- <p>Are you sure wanna delete <b>{{cart.cartGameData.title}}</b>?</p> -->

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
										<button type="submit" @click="checkOut" class="btn btn-success mb-4">Checkout!</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- CANNOT IMPLEMENT THIS TOAST HERE -->
			<!-- <div style="display: none;" id="uploadPayment" class="animated-modal">
				<h2>Hello!</h2>
				<p>Silahkan upload bukti pembayarannya ya~</p>
				<form @submit="checkOut" enctype="multipart/form-data">
					<div class="form-group" >
						<input type="file" accept="image/*" class="form-control-file" required>
					</div>
					<button type="submit" data-fancybox-close class="btn btn-success mb-4 form-control">Checkout!</button>
				</form>
			</div> -->

			<!-- <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
				<div class="toast" style="position: absolute; top: 0; right: 0;">
					<div class="toast-header">
						<img src="" class="rounded mr-2" alt="...">
						<strong class="mr-auto">Bootstrap</strong>
						<small>11 mins ago</small>
						<button @click="info == false" type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="toast-body">
						User berhasil terhapus
					</div>
				</div>
			</div> -->

			<!-- ONLY FOR DEVELOPING -->
			<!-- <div class="card bg-light">
				<div class="card-header">
					<h3>Cart ID</h3> 
				</div>
				<div class="card-inner">
					<div class="card bg-dark">
						<div class="card-inner bg-dark">
							<pre class="text-warning">{{cartId}}</pre>
						</div>
					</div>
				</div>
			</div> -->

			<!-- <div class="card bg-light">
				<div class="card-header"> 
					<h3>Cart Item ID</h3>
				</div>
				<div class="card-inner">
					<div class="card bg-dark">
						<div class="card-inner bg-dark">
							<pre class="text-warning">{{cartItemId}}</pre>
						</div>
					</div>
				</div>
			</div> -->

			<div class="card bg-light">
				<div class="card-header"> 
					<h3>List Cart User</h3> 
				</div>
				<div class="card-inner">
					<div class="card bg-dark">
						<div class="card-inner bg-dark">
							<pre class="text-warning">{{userCart}}</pre>
						</div>
					</div>
				</div>
			</div>

			<!-- <div class="card bg-light">
                <div class="card-header"> <h3>Members</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{userCart}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
			<!-- ONLY FOR DEVELOPING -->

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
			info: false,
			cartId: '',
			cartItemId: '',

			//buat toastnya
      		count: moment(0),
      		toastTitle: '',
      		toastMessage: '',
      		toastVariant: ''
		}
	},
	methods: {
		getCart() {
			this.axios.get('cart/user').then(response => {
				this.userCart = response.data.data
				this.cartId = response.data.data.cartId
			})
		},
		deleteCart(index) {
			this.count = moment(0)
			let headers = {
				"headers": {
						"content-type": "application/json",
				},
			}
			let deleleCartId = this.userCart.items[index].cartItemId
			this.axios.put('/cart/remove/'+deleleCartId, headers).then(response => {
				console.log(response)
				console.log('Berhasil Menghapus Dari Keranjang')

				// Buat Toast
        		this.toastVariant = 'warning'
        		this.toastTitle = 'Berhasil!'
        		this.toastMessage = response.data.message
        		this.$bvToast.show('my-toast')

				this.getCart() //auto refresh page
			}).catch(error => {
				console.log(error.response);

				// Buat Toast
        		this.toastVariant = 'danger'
        		this.toastTitle = 'Terdapat Kesalahan!'
        		this.toastMessage = error.response.data.message
        		this.$bvToast.show('my-toast')
			})
			this.info = true
		},
		checkOut() {
			let cartId = this.cartId
			console.log(cartId);
			this.axios.post('transaction/checkout', {
				cartId: cartId
				}).then(response => {
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