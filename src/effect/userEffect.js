import { reactive } from "vue";
import { toRefs } from "vue";

import { get } from "../utils/request";

export const userEffect = () => {
    const adrList = reactive({ addressList: {} })
    const getAddressList = async () => {
        const index=0
        try {
            const result = await get("api/user/address");
            // console.log(result);
            if (result.errno == 0 && result?.data?.length) {
                adrList.addressList = result.data[index]
            }
        } catch (e) {
            console.log(e)
        }
    };
    getAddressList();
    const { addressList } = toRefs(adrList)
    return { addressList };

}