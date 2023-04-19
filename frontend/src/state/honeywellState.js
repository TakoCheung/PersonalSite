import { createStore } from 'vuex';

const hw = {
  hwTimeLineShown: false,
  hwDetailsShown: false
};

const hwToggle = {
  toggleHwDetails(){
    hw.hwDetailsShown = !hw.hwDetailsShown
  },
  toggleHwTimeLine(){
    hw.hwTimeLineShown = !hw.hwTimeLineShown
  }
};

export default createStore({
  hw,
  hwToggle,
});
