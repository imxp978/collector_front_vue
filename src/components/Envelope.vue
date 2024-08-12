<template>

  <!-- display -->
  <div class="col-12">
    <div class="container p-5">
      <h3>
        {{ envelope.country_from ? envelopeStore.countries[envelope.country_from - 1].c_name : "" }},
        {{ envelope.country_from ? envelopeStore.countries[envelope.country_from - 1].name : "" }} >>
        {{ envelope.country_to ? envelopeStore.countries[envelope.country_to - 1].c_name : "未寄出" }}
        {{ envelope.country_to ? `, ${envelopeStore.countries[envelope.country_to - 1].name}` : "" }}
      </h3>
      <h5>
        {{ envelope.city_from }} {{ envelope.zip_from }} >> {{ envelope.city_to }} {{ envelope.zip_to }}<br />

      </h5>
      <hr>
      <p class="mx-2">
        編號：{{ envelope.id }}<br>
        主題：{{ envelope.theme }}<br>
        類型：{{ envelope.type ? envelopeStore.types[envelope.type - 1].type : "" }}<br>
        年份：{{ envelope.time }}<br>
        備註：{{ envelope.remark }}<br>
      </p>
      <hr>
      
      <div class="row">
        <div v-for="j in envelope.img" :key="j.id" class="col-4">
          <img
            :src="'/images/envelopes/' + j.img"
            @click="showModal(j)"
            class="img-fluid mx-3 img-display"
          />
          <!-- << modal -->
          <Transition name="modal">
            <div v-if="j.display" class="modal-mask">
              <div class="modal-container">
                <div>
                  <button
                    class="modal-default-button btn-close"
                    @click="closeModal(j)"
                  ></button>
                  <p>{{ j.img }}</p>
                </div>
                <img
                  :key="j.id"
                  :src="'/images/envelopes/' + j.img"
                  class="img-modal"
                />
              </div>
            </div>
          </Transition>
          <!-- modal >> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useEnvelopeStore } from "../stores/EnvelopeStore.js";

const route = useRoute();
const envelopeStore = useEnvelopeStore();
const EId = ref(parseInt(route.params.id));
const envelope = ref("");

function getEnvelope() {
  envelopeStore.getEnvelopeById(EId.value);
  envelope.value = envelopeStore.getEnvelopeById(EId.value);
  console.log('c E: ', envelope.value)
  console.log('c E.country_from: ', envelope.value.country_from)
}

onMounted(() => {
  getEnvelope();
});

function showModal (i) {
  i.display = true;
}

function closeModal (i) {
  i.display = false;
}
</script>

<style scoped>

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

.container {
  background-color: rgb(247,247,247);
  border-radius: 10px;
  transition: 0.3s;
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
