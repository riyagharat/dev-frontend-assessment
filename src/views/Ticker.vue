<template>
    <div>
      <div class="primary-heading-con">
          <div class="heading">
              <div class="title">Tickers</div>
          </div>
      </div>

      <div class="page-content-con">
          <loading v-if="loading"></loading>
          <div v-else>
                 <section class="hero is-info is-medium is-bold">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                        <h1 class="title">
                            <pre><h5 class="heading is-size-5">{{this.symbol}} : <small class="is-size-7">{{companyData.companyName}}</small></h5></pre>
                        </h1>
                        <h2 class="subtitle">
                            <pre><h5 class="is-size-10">Day 50 Moving Avg  {{companyData.day50MovingAvg}}</h5><br></pre>
                            <pre><h5 class="is-size-10">Year 1 Change Percent  {{companyData.year1ChangePercent}}</h5><br></pre>
                        </h2>
                        </div>
                    </div>
                </section>
             </div>
          </div>
      </div>
</template>

<script>
import API from '../api/IEX';
export default {
    name : "Tickers",
    data () {
        return {
            loading : true,
            companyData : [],
            symbol : ''
        };
    },
    created() {
        this.symbol = this.$route.params.symbol;
        console.log(this.symbol);
        API.getStockTicker(this.symbol).then(response => {
            this.companyData = response.data;
            console.log(this.companyData);
        }).finally(() => {
            this.loading = false;
        });
    },
}
</script>

<style lang="scss" scoped>
    @import '../assets/css/_theme';
    .company {
        margin-bottom:10px;
        padding-bottom:10px;
        border-bottom:1px solid $white-ter;
    }
</style>
