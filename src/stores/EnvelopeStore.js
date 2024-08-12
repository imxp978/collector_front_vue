import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export const useEnvelopeStore = defineStore('EnvelopeStore', ()=> {
  const envelopes = ref([]);
  const countries = ref([]);
  const types = ref([]);
  const type = ref('');
  const sendCountry = ref('');
  const sendCity = ref('');
  const sendZip = ref('');
  const toCountry = ref('');
  const toCity = ref('');
  const toZip = ref('');
  const remark = ref('');
  const sendTime = ref('');
  const theme = ref('');
  const image1 = ref('');
  const image2 = ref('');
  const image3 = ref('');
  const message = ref('輸入查詢條件');
  const isLoading = ref(false);
  const success = ref(false);


  let urlSource = 'http://localhost:8888/git-files/collector';
urlSource = '.';

// get country
async function getCountry() {
  try {
    const url = `${urlSource}/controllers/getCountry.php`;
    const response = await axios.get(url);
    if (response.data.success) {
      countries.value = response.data.countryData;
    } else {
      message.value = response.data.message;
    }
  } catch(error) {
    message.value = error.message;
  }
}

// onMounted(() => {
//   getCountry();
// })

// get type
async function getType() {
  try{
    const url = `${urlSource}/controllers/getType.php`;
    const response = await axios.get(url);
    if (response.data.success) {
      types.value = response.data.typeData;
    } else {
      message.value = response.data.message;
    }
  } catch(error){
    message.value = error.message;
  }
}

// onMounted(() => {
//   getType();
// })

// check envelope
async function checkEnvelope(country, time) {
  console.log('===== query begin =====')
  // console.log('store country: ', country)
  // console.log('store time: ', time)
  try {
    isLoading.value = true;
    // if (sendCountry.value !== ''){
    //   console.log('send country:', sendCountry.value);
    // }

    const queryUrl = `${urlSource}/controllers/checkEnvelope.php?country=${country}&year=${time}`;
    const response = await axios.get(queryUrl);
  
    if (response.data.success) {
      console.log('success')
      message.value = response.data.message;
      envelopes.value = response.data.envelopeData.map(envelope => ({
          ...envelope, edit: false,
        }));
      success.value = true;
      console.log('store: ', envelopes.value)
    } else {
      console.log('failed');
      envelopes.value = [];
      message.value = response.data.message;
      success.value = false;
    }
      
  } catch(error) {
      message.value = error.message;
      success.value = false;
      console.error('error: ', error.message);
  } finally {
    isLoading.value = false;

  }
  // console.log('envelopes: ', envelopes.value);
};

function getEnvelopeById(id) {
  const envelope = envelopes.value.find((item)=> item.id == id);
  return envelope;
}

  return {
    envelopes,
    countries ,
    types ,
    type ,
    sendCountry ,
    sendCity,
    sendZip ,
    toCountry, 
    toCity ,
    toZip ,
    remark ,
    sendTime,
    theme ,
    image1 ,
    image2 ,
    image3 ,
    message ,
    isLoading, 
    success ,
    getCountry,
    getType,
    checkEnvelope,
    getEnvelopeById

  }
})