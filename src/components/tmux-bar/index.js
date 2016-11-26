import browser from 'browser'
import Moment from 'moment'

export default {
  name: 'tmux-bar',
  data () {
    return {
      browser,
      time: Moment().format('HH:mm'),
      month: Moment().format('MMM'),
      day: Moment().format('do'),
      year: Moment().format('YYYY'),
      dayWord: Moment().format('ddd')
    }
  }
}
