<template>
  <section class="d-flex flex-column ga-4">
    <h4>Payment Method</h4>

    <v-radio-group hide-details="auto">
      <v-table>
        <tbody>
          <tr>
            <td>
              <v-radio
                label="FedEx "
                value="fedex"
                color="green"
              ></v-radio>
            </td>
            <td>3 days</td>
            <td>$3.00</td>
          </tr>
          <tr>
            <td>
              <v-radio
                label="InPost"
                value="inpost"
                color="green"
              ></v-radio>
            </td>
            <td>3 days</td>
            <td>$3.00</td>
          </tr>
        </tbody>
      </v-table>
    </v-radio-group>
  </section>
</template>

<script lang="ts" setup>
const isCompany = false;
</script>
