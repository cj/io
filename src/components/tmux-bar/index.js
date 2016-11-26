import Moment from 'moment'
import platform from 'platform'

export default {
  name: 'tmux-bar',
  data() {
    return {
      platform,
      moment: new Moment(),
      timer: null
    }
  },
  computed: {
    time()    { return this.moment.format('HH:mm') },
    month()   { return this.moment.format('MMM') },
    day()     { return this.moment.format('do') },
    year()    { return this.moment.format('YYYY') },
    dayWord() { return this.moment.format('ddd') }
  },
  created() {
    this.timer = setInterval(() => {
      this.moment = new Moment()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
