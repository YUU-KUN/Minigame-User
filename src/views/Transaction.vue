<template>
<div class="container-fluid" style="margin-top:100px">
  <div class="row">
        <div class="col-md-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Transaksi Anda</h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>User</th>
                                            <th>Item</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Payment</th>
                                            <th>Date</th>
                                            <!-- <th>Action</th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="(transaction, index) in userTransaction" :key="index">
                                                <td>{{index+1}}</td>
                                                <td>
                                                  <span v-if="transaction.user">{{transaction.user}}</span>
                                                  <span v-else>-</span>
                                                </td>
                                                <td>
                                                  <ul>
                                                    <span v-for="(items, index) in transaction.items" :key="index"><li>{{items.cartGameData.title}}</li></span>
                                                  </ul>
                                                </td>
                                                <td>{{transaction.total | rupiah}}</td>
                                                <td>
                                                  <span v-if="transaction.status == 0">Menunggu Bukti Pembayaran</span>
                                                  <span v-else-if="transaction.status == 1">Transaksi Terkonfirmasi</span>
                                                  <span v-else-if="transaction.status == 2">Menunggu Konfirmasi Admin</span>
                                                  <span v-else-if="transaction.status == 3">Transaksi Ditolak</span>
                                                  <span v-else>Transaksi Kadaluarsa</span>
                                                </td>
                                                <td>
                                                    <span class="d-flex justify-content-center" v-if="transaction.status ==  1 || transaction.status == 2 || transaction.status == 3">
                                                      <a :href="transaction.buktiPembayaran" target="_blank"><span class="badge badge-success">Lihat Bukti Pembayaran</span></a>
                                                    </span>
                                                    <span class="d-flex justify-content-center" v-else-if="transaction.status == 0">
                                                      <a href="" data-fancybox :data-src="'#bukti'+index"><span class="badge badge-warning">Upload Bukti Pembayaran</span></a>
                                                    </span>
                                                    <span v-else class="d-flex justify-content-center">
                                                      -
                                                    </span>
                                                </td>
                                                <td>{{transaction.createdAt | formatDate}}</td>
                                                <!-- <td>
                                                  <span v-if="transaction.status == 1" class="d-flex justify-content-center">
                                                    <a href="" data-fancybox :data-src="'#'+index"><span class="badge badge-primary">Lihat Kode Game</span></a>
                                                  </span>
                                                  <span class="d-flex justify-content-center" v-else><button class="btn btn-danger" @click="deleteUserTransaction(index)" title="Delete Transaction" ><b-icon icon="trash2-fill"></b-icon></button></span>
                                                </td> -->

                                                <div style="display: none;" :id="index" class="animated-modal">
                                                  <h2>Hello!</h2>
                                                  <p>This is animated content! Cool, right?</p>
                                                </div>

                                                <div style="display: none;" :id="'bukti'+index" class="animated-modal">
                                                  <h2>Hello!</h2>
                                                  <p>Silahkan upload bukti pembayarannya ya~</p>
                                                    <div class="form-group" >
                                                      <input type="file" id="buktiPembayaran" name="buktiPembayaran" class="form-control" accept="image/*" @change="onFileSelected" required>
                                                    </div>
                                                    <button @click="uploadPayment(index)" type="button" data-fancybox-close class="btn btn-success mb-4 form-control">Checkout!</button>
                                                </div>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ONLY FOR DEVELOPING -->
              <!-- <div class="card bg-light">
                <div class="card-header"> <h3>List Transaksi User</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{userTransaction}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              <!-- ONLY FOR DEVELOPING -->

              <!-- Toast di pojok kanan atas -->
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
            userTransaction: '',
            poster: '',
            posterUrl: '',
            buktiPembayaran: '',
            buktiPembayaranUrl: '',

            //buat toastnya
      		  count: moment(0),
      		  toastTitle: '',
      		  toastMessage: '',
      		  toastVariant: ''
        }
    },
    methods: {
        getUserTransaction() {
            this.axios.get('/transaction/user').then(response => {
                this.userTransaction = response.data.data.reverse()
            })
        },

        onFileSelected(event) {
            this.buktiPembayaran = event.target.files[0]
            console.log(this.buktiPembayaran);

            this.posterUrl = URL.createObjectURL(this.buktiPembayaran)
            console.log('urlnya: '+this.posterUrl);
        },

        uploadPayment(index) {
          this.count = moment(0)
          let headers = {
                'headers': {
                    'Content-Type' : 'multipart/form-data',
                },
            }
          let transactionID = this.userTransaction[index].transaksiId
          let formData = new FormData();
          formData.append('file', this.buktiPembayaran); 

          this.axios.put('transaction/upload-bukti/'+transactionID, formData, headers).then(response => {
            console.log(response)
            // this.info = true
            // this.notif = "Bukti transaksi berhasil diupload!"
            
            // Buat Toast
        		this.toastVariant = 'success'
        		this.toastTitle = 'Berhasil!'
        		this.toastMessage = response.data.message
        		this.$bvToast.show('my-toast')

            this.getUserTransaction()
          }).catch(error => {
            console.log(error);
            
            // Buat Toast
        		this.toastVariant = 'danger'
        		this.toastTitle = 'Terdapat Kesalahan!'
        		this.toastMessage = response.data.message
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

        this.getUserTransaction()
    }
}
</script>

<style>
</style>