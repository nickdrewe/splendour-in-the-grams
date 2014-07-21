soundManager.setup({
  url: '/swf/',
  onready: function() {
    var sound = soundManager.createSound({
      id: 'triplej',
      url: 'http://shoutmedia.abc.net.au:10426/;'
    });
    //mySound.play();
  },
  ontimeout: function() {
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  }
});