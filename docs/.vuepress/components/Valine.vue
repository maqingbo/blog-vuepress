<template>
<div id="vcomments"></div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function() {
    // require window
    const Valine = require('valine')
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
    }

    new Valine({
      el: '#vcomments',
      appId: 'FDxLtX1kRrg4FS96N87CAs1v-gzGzoHsz',
      appKey: 'xfsehzmVrPHyqoSwjOe1wp5A',
      notify: false,
      verify: true,
      visitor: true,
      avatar: 'robohash',
      placeholder: '欢迎盖楼ヽ(￣▽￣)ﾉ'
    })
  },
}
</script>
