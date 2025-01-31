/**
 * NukoApi.js
 */
"use strict";

import { NukoEtc } from "./NukoEtc.min.js";

const NUKOAPI = "https://api.nuko.town/";

/**
 * NukoApi
 */
export class NukoApi {
  /**
   * getActiveUsers
   */
  static async getActiveUsers(address) {
    if ($("#swapSwitch").prop("checked")) {
      const digest = await NukoEtc.sha256(address);
      let param = { hash: digest };
      NukoEtc.postData(NUKOAPI + "v1/activeUsers", param).then((data) => {
        //console.log(param, data);
        $("#activeUsers").text(data.activeUsers);
      });
    } else {
      fetch(NUKOAPI + "v1/activeUsers")
        .then((response) => response.json())
        .then((data) => {
          $("#activeUsers").text(data.activeUsers);
        });
    }
  }

  /**
   * getCommunityBalance
   */
  static async getCommunityBalance(address, nuko, updateCommunityBalance) {
    if ($("#swapSwitch").prop("checked")) {
      const digest = await NukoEtc.sha256(address);
      let param = {
        hash: digest,
        jpyc: nuko.balanceJPYC * 1e-18,
        usdc: nuko.balanceUSDC * 1e-6,
        upper: nuko.upperThreshold,
        lower: nuko.lowerThreshold,
      };
      NukoEtc.postData(NUKOAPI + "v1/communityBalance", param).then((data) => {
        updateCommunityBalance(data, nuko.jpyusd);
      });
    } else {
      fetch(NUKOAPI + "v1/communityBalance")
        .then((response) => response.json())
        .then((data) => {
          updateCommunityBalance(data, nuko.jpyusd);
        });
    }
  }
}
