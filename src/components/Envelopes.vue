<template>
  <div>
    <!-- query & add -->
    <div>
      <div class="container-fluid mb-4 p-3">
        <h3 class="text-center pt-3">郵封</h3>
        <hr>
        <div class="row d-flex justify-content-center">
          <div class="col-12 row">
            <div class="col-12 col-md-4">
              <select v-model.number="sendCountry" class="form-control mb-3" value="" autofocus required>
                <option value="" selected disabled>寄出國家 Country From</option>
                <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }} | {{
                  country.code }} {{ country.c_name }}</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <div class="text-end">
                <input type="text" class="form-control" v-model="sendTime" placeholder="郵戳年份 Send Year (YYYY)" />
              </div>
            </div>  
            <div class="col-12 col-md-4 text-end">
              <button @click.prevent="checkEnvelope" class="btn btn-dark my-3">查閱郵封</button><br>
            </div>
          </div>
          <hr>
        </div>
      </div>
      <hr>
      <!-- thumbnail -->
      <div class="container-fluid mb-4 p-3">
        <div v-if="envelopeStore.isLoading" class="loader"></div>
        <div v-else>
          <h3 class="my-2 text-center" :class="envelopeStore.success? 'text-primary': 'text-danger'">{{ message }}</h3>
          <div class="col-12 row">
            <div class="col-6 col-md-2 px-4 mb-5" v-for="i in envelopes" :key="i.id">
              <hr class="mt-2">
              <p>[{{ (i.country_from && i.country_from !== null) ? countries[i.country_from-1].c_name : '' }}] >> [{{ (i.country_to && i.country_to !== null)? countries[i.country_to-1].c_name : '' }}] | {{ i.img.length ? i.img[0].img : '' }}</p>
              <!-- <a :href="'#' + i.id"><img v-if="i.img.length" :src="'images/envelopes/' + i.img[0].img" class="img-fluid img-thumb"></a> -->
              <RouterLink :to="{ name: 'envelope', params: { id: i.id }}">
                <img v-if="i.img.length" :src="'images/envelopes/' + i.img[0].img" class="img-fluid img-thumb">
            </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <!-- detail -->
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/AuthStore.js';
import { useEnvelopeStore } from '../stores/EnvelopeStore.js';

const envelopeStore = useEnvelopeStore();

const envelopes = ref();
const countries = ref([]);
const types = ref([]);
const sendCountry = ref('');
const sendTime = ref('');

const type = ref('');
const sendCity = ref('');
const sendZip = ref('');
const toCountry = ref('');
const toCity = ref('');
const toZip = ref('');
const remark = ref('');
const theme = ref('');
const image1 = ref('');
const image2 = ref('');
const image3 = ref('');
const message = ref('輸入查詢條件');
const isLoading = ref(false);
const success = ref(false);

// envelopes.value = envelopeStore.envelopes
// countries.value = envelopeStore.countries
// sendTime.value = envelopeStore.sendTime
// message.value = envelopeStore.message
// isLoading.value = envelopeStore.isLoading
// success.value = envelopeStore.success

let urlSource = 'http://localhost:8888/git-files/collector';
// urlSource = '.';

// get country
// async function getCountry() {
//   try {
//     const url = `${urlSource}/controllers/getCountry.php`;
//     const response = await axios.get(url);
//     if (response.data.success) {
//       countries.value = response.data.countryData;
//     } else {
//       message.value = response.data.message;
//     }
//   } catch(error) {
//     message.value = error.message;
//   }
// }

async function getCountry() {
  await envelopeStore.getCountry();
  countries.value = envelopeStore.countries
}

async function getType() {
  await envelopeStore.getType();
  types.value = envelopeStore.types
} 

onMounted(() => {
  getCountry();
  getType();
})

// get type
// async function getType() {
//   try{
//     const url = `${urlSource}/controllers/getType.php`;
//     const response = await axios.get(url);
//     if (response.data.success) {
//       types.value = response.data.typeData;
//     } else {
//       message.value = response.data.message;
//     }
//   } catch(error){
//     message.value = error.message;
//   }
// }

// onMounted(() => {
//   getType();
// })

async function checkEnvelope() {
  await envelopeStore.checkEnvelope(sendCountry.value, sendTime.value)
  envelopes.value = envelopeStore.envelopes;
  console.log('c es: ',envelopes.value)
}
// check envelope
// async function checkEnvelope() {
//   console.log('===== query begin =====')
//   try {
//     isLoading.value = true;
//     // if (sendCountry.value !== ''){
//     //   console.log('send country:', sendCountry.value);
//     // }

//     const queryUrl = `${urlSource}/controllers/checkEnvelope.php?country=${sendCountry.value}&year=${sendTime.value}`;
//     const response = await axios.get(queryUrl);
  
//     if (response.data.success) {
//       console.log('success')
//       message.value = response.data.message;
//       envelopes.value = response.data.envelopeData.map(envelope => ({
//           ...envelope, edit: false,
//         }));
//       success.value = true;
//     } else {
//       console.log('failed');
//       envelopes.value = [];
//       message.value = response.data.message;
//       success.value = false;
//     }
      
//   } catch(error) {
//       message.value = error.message;
//       success.value = false;
//       console.error('error: ', error.message);
//   } finally {
//     isLoading.value = false;

//   }
//   // console.log('envelopes: ', envelopes.value);
// };

// add envelope
// function selectFile1(event) {
//   image1.value = event.target.files[0];
//   console.log(event.target.files);
// }
// function selectFile2(event) {
//   image2.value = event.target.files[0];
//   console.log(event.target.files);
// }
// function selectFile3(event) {
//   image3.value = event.target.files[0];
//   console.log(event.target.files);
// }

// async function addEnvelope() {
//   isLoading.value = true;

//   const formData = new FormData();
//   formData.append('sendCountry', sendCountry.value,);
//   formData.append('sendCity', sendCity.value);
//   formData.append('sendZip', sendZip.value);
//   formData.append('toCountry', toCountry.value,);
//   formData.append('toCity', toCity.value);
//   formData.append('toZip', toZip.value);
//   formData.append('remark', remark.value);
//   formData.append('sendTime', sendTime.value);
//   formData.append('theme', theme.value);
//   formData.append('type', type.value);
//   formData.append('image1', image1.value);
//   formData.append('image2', image2.value);
//   formData.append('image3', image3.value);
//   try {
//     const response = await axios.post(`${urlSource}/controllers/addEnvelope.php`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     if (response.data.success) {
//       message.value = response.data.message;
//       envelopes.value = response.data.envelopeData.map(envelope => ({
//           ...envelope, edit: false
//         }));
//       success.value = true;
//       console.log('success');
//     } else {
//       success.value = false;
//       message.value = response.data.message;
//       console.log('failed')
//     }
//   } catch(error) {
//     message.value = error.message;
//     success.value = false;
//     console.error('error', error);
//   } finally {
//     isLoading.value = false;
//     // type.value = '';
//     // sendCity.value = '';
//     // sendZip.value = '';
//     // toCountry.value = '';
//     // toCity.value = '';
//     // toZip.value = '';
//     // remark.value = '';
//     // sendTime.value = '';
//     // theme.value = '';
//     checkEnvelope();
//   }
// }

// edit envelope
// const isEditing = ref(false);
// const newSendCountry = ref('');
// const newSendCity = ref('');
// const newSendZip = ref('');
// const newToCountry = ref('');
// const newToCity = ref('');
// const newToZip = ref('');
// const newSendTime = ref('');
// const newTheme = ref('');
// const newType = ref('');
// const newRemark = ref('');
// const newImage1 = ref('');
// const newImage2 = ref('');
// const newImage3 = ref('');

// function selectNewFile1(event) {
//   newImage1.value = event.target.files[0];
// }
// function selectNewFile2(event) {
//   newImage2.value = event.target.files[0];
// }
// function selectNewFile3(event) {
//   newImage3.value = event.target.files[0];
// }

// function editEnvelope(envelope) {
//   // console.log(stamp);

//   envelope.edit = true;
//   isEditing.value = true;
//   newSendCountry.value = envelope.country_from;
//   newSendCity.value = envelope.city_from;
//   newSendZip.value = envelope.zip_from;
//   newToCountry.value = envelope.country_to;
//   newToCity.value = envelope.city_to;
//   newToZip.value = envelope.zip_to;
//   newSendTime.value = envelope.time;
//   newTheme.value = envelope.theme;
//   newType.value = envelope.type;
//   newRemark.value = envelope.remark;
// }

// function cancelEdit(envelope) {
//   envelope.edit = false;
//   isEditing.value = false;
// }

// async function updateEnvelope(envelope) {
//   isLoading.value = true;
//   envelope.edit = false;
//   isEditing.value = false;

//   const formData = new FormData();
//   formData.append('id', envelope.id);
//   formData.append('newSendCountry', newSendCountry.value,);
//   formData.append('newSendCity', newSendCity.value,);
//   formData.append('newSendZip', newSendZip.value,);
//   formData.append('newToCountry', newToCountry.value,);
//   formData.append('newToCity', newToCity.value,);
//   formData.append('newToZip', newToZip.value,);
//   formData.append('newSendTime', newSendTime.value);
//   formData.append('newType', newType.value);
//   formData.append('newTheme', newTheme.value);
//   formData.append('newRemark', newRemark.value);
//   formData.append('newImage1', newImage1.value);
//   formData.append('newImage2', newImage2.value);
//   formData.append('newImage3', newImage3.value);

//   try {
//     const response = await axios.post(`${urlSource}/controllers/updateEnvelope.php`, formData, {

//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     console.log('response: ', response)
//     if (response.data.success) {
//       // envelopes.value = response.data.envelopeData;
//       message.value = response.data.message;
//       success.value = true;
//       console.log(response.data.message);
//     } else {
//       message.value = response.data.message;
//       success.value = false;
//       console.log(response.data.message)
//     }
    
//   } catch (error) {
//     console.error('error: ', error);
//     success.value = false;
//   } finally {
//     isLoading.value = false;
//     checkEnvelope();
//   }
// }

function showModal (i) {
  i.display = true;
}

function closeModal (i) {
  i.display = false;
}



</script>

<style scoped>
* {
  word-wrap:break-word;
}

body {
  background-color: #ffffff;
}

img {
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.38);
  transition: 0.2s;
}

img:hover {
  scale: 1.05;
  transition: 0.3s;
}

.img-thumb {
  max-height: 200px;
}

.img-display {
  cursor: pointer;
  max-height: 300px;
}

.img-modal {
  max-height: 85vh;
  max-width: 95%;
}

.img-modal:hover {
  scale: 1;
}

.container-fluid {
  background-color: rgb(247,247,247);
  border-radius: 10px;
  transition: 0.3s;
}

.container-fluid:hover {
  background-color: rgb(230,230,230);
  transition: 0.3s;
}

.loader {
  margin: 0 auto;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 0.3s linear infinite;
  z-index: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* modal */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.66);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  max-height: 90vh;
  margin: auto;
  padding: 20px 30px;
  background-color: rgb(247,247,244);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>