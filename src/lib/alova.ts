import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

const alovaInstance = createAlova({
    requestAdapter: adapterFetch(),
    responded: async (response) => {
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      }
      
})

export default alovaInstance