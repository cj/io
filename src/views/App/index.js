import tmuxBar from 'components/tmux-bar.vue'
import navigation from 'components/navigation.vue'

export default {
  name: 'app',
  components: {
    tmuxBar,
    navigation
  },
  mounted() {
    const gutter = document.getElementById('app__gutter')
    const height = gutter.clientHeight
    const pre    = gutter.getElementsByTagName('pre')[0]

    for (var i of Array(height).keys()) {
      pre.appendChild(document.createElement('span'))
    }
  }
}
