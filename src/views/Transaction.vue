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
                                
                                <b-table
                    id="my-table"
                    class="table table-bordered"
                    :items="userTransaction"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="fields"
                  >

                      <template v-slot:cell(no)="data">
                          <span>{{data.index+1}}</span>
                      </template>
                      <template v-slot:cell(user)="data">
                        <span v-if="data.item.userData">
                          <span>{{data.item.userData.name}}</span>
                        </span>
                        <span v-else>-</span>
                      </template>
                      <template v-slot:cell(item)="data">
                        <ul>
                          <span v-for="(items, index) in data.item.transactionItems" :key="index">
                            <li>{{items.gameData.gameTitle}}</li>
                          </span>
                        </ul>
                      </template>
                      <template v-slot:cell(total)="data">
                        {{data.item.transactionTotal | rupiah}}
                      </template>
                      <template v-slot:cell(status)="data">
                        <span v-if="data.item.transactionStatus == 0">Menunggu Bukti Pembayaran</span>
                        <span v-else-if="data.item.transactionStatus == 1">Transaksi Terkonfirmasi</span>
                        <span v-else-if="data.item.transactionStatus == 2">Menunggu Konfirmasi Admin</span>
                        <span v-else-if="data.item.transactionStatus == 3">Transaksi Ditolak</span>
                        <span v-else>Transaksi Kadaluarsa</span>
                      </template>
                      <template v-slot:cell(payment)="data">
                        <span class="d-flex justify-content-center" v-if="data.item.transactionStatus ==  1 || data.item.transactionStatus == 2 || data.item.transactionStatus == 3">
                          <a :href="data.item.transactionImage.url" target="_blank"><span class="badge badge-success">Lihat Bukti Pembayaran</span></a>
                        </span>
                        <span class="d-flex justify-content-center" v-else-if="data.item.transactionStatus == 0">
                          <a href="" data-fancybox :data-src="'#bukti'+data.index"><span class="badge badge-warning">Upload Bukti Pembayaran</span></a>
                        </span>
                        <span v-else class="d-flex justify-content-center">
                          -
                        </span>

                        <div style="display: none;" :id="'bukti'+data.index" class="animated-modal">
                          <h2>Hello!</h2>
                          <p>Silahkan upload bukti pembayarannya ya~</p>
                            <div class="form-group" >
                              <input type="file" id="image" name="image" ref="image" class="form-control" accept="image/*" @change="onFileSelected">
                            </div>
                            <button @click="uploadPayment(data.index)" type="button" data-fancybox-close class="btn btn-success mb-4 form-control">Checkout!</button>
                        </div>
                      </template>
                      <template v-slot:cell(date)="data">
                        {{data.item.createdAt | formatDate}}
                      </template>
                  </b-table>
                  <br>
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    align="center"
                  ></b-pagination>
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
            userTransaction: [],
            poster: '',
            posterUrl: '',
            buktiPembayaran: '',
            buktiPembayaranUrl: '',

            //buat toastnya
      		  count: moment(0),
      		  toastTitle: '',
      		  toastMessage: '',
      		  toastVariant: '',

            currentPage: 1,
            perPage: 10,
            fields: ['no', 'user', 'item', 'total', 'status', 'payment', 'date']

        }
    },
    methods: {
        getUserTransaction() {
            this.axios.get('transaction/list/user').then(response => {
                this.userTransaction = response.data.data
            })
        },

        onFileSelected(event) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.buktiPembayaran = e.target.result
          }
            // const image = this.$refs.image.files[0]
          const buktiPembayaran = event.target.files[0]
          reader.readAsDataURL(buktiPembayaran)
          console.log(this.buktiPembayaran);
          
            // this.buktiPembayaran = event.target.files[0]
            // console.log(this.buktiPembayaran);

            // this.posterUrl = URL.createObjectURL(this.buktiPembayaran)
            // console.log('urlnya: '+this.posterUrl);
        },

        uploadPayment(index) {
          this.count = moment(0)
          let headers = {
                'headers': {
                    'Content-Type' : 'application/json',
                },
            }
          let transactionID = this.userTransaction[index].transactionId
          const dataBukti = {
            image: this.buktiPembayaran
          }
          // let formData = new FormData();
          // formData.append('file', this.buktiPembayaran); 

          this.axios.put('transaction/upload/'+transactionID, dataBukti).then(response => {
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
            console.log(error.response);
            
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
        },
        rows() {
            return this.userTransaction.length
        },
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