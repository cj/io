import tmuxBar    from 'components/tmux-bar.vue'
import navigation from 'components/navigation.vue'
import debounce   from 'lodash/debounce'

export default {
  name: 'app',
  components: {
    tmuxBar,
    navigation
  },
  methods: {
    updateGutter() {
      const gutter    = document.getElementById('app__gutter')
      const height    = parseInt(gutter.clientHeight / 13)
      const pre       = gutter.getElementsByTagName('pre')[0]

      console.log('updateGutter')

      Array(height).fill().forEach(() => {
        pre.appendChild(document.createElement('span'))
      })
    }
  },
  mounted() {
    this.updateGutter()
    window.addEventListener('resize', debounce(this.updateGutter, 250))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateGutter)
  }
}
