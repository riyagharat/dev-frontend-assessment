<template>
    <div>
      <div class="primary-heading-con">
          <div class="heading">
              <div class="title">Symbols/Tickers</div>
          </div>
      </div>

      <div class="page-content-con">
          <loading v-if="loading"></loading>
          <div v-else>
            Search: <input type="text" v-model="search"/>
             <button @click="invertSort()">Sort asc/desc</button>
             <div class="columns is-muiltiline"  style="flex-wrap: wrap;">
                    <div
                        v-for="company in filteredAndSortedCompanies"
                        :key="company.symbol"
                        class="company"
                    >
                    <router-link :to="{ name: 'ticker', params: {symbol: company.symbol}}">
                        <div class ="tile is-12 is-vertical is-parent">
                            <pre><h5 class="heading is-size-5">{{company.symbol}} : <small class="is-size-7">{{company.companyName}}</small></h5>
                            <div>Open <money :value="company.open"></money></div>
                            <div>Close <money :value="company.close"></money></div>
                            <timestamp :value="company.openTime"></timestamp> - <timestamp :value="company.closeTime"></timestamp>
                            </pre>
                        </div>
                    </router-link>
                </div>
             </div>
          </div>
      </div>

    </div>
</template>

<script>
import API from '../api/IEX';
export default {
    name : "Symbols",
    data () {
        return {
            search : '',
            loading : true,
            companies : [],
            sortAsc : true
        };
    },
    beforeMount () {
        API.getCompanies().then(response => {
            this.companies = response.data;
        }).finally(() => {
            this.loading = false;
        });
    },
    computed : {
        filteredAndSortedCompanies : function ()
        {
            var self=this;
            let result = this.companies.filter(function(com){return (com.companyName.toLowerCase().indexOf(self.search.toLowerCase())>=0) || com.symbol.toLowerCase().indexOf(self.search.toLowerCase())>=0});

            let ascDesc = this.sortAsc ? 1 : -1;
            return result.sort((a, b) => ascDesc * a.companyName.localeCompare(b.companyName));
        }
    },
    methods : {
        invertSort() {
            this.sortAsc = !this.sortAsc;
        },
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
