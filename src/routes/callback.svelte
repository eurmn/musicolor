<script>
  import { Buffer } from 'buffer';

  let query = window.location.hash.substring(1).split('&');
  let token = query[0].split('=')[1];
  let expireTime = query[2].split('=')[1];
  localStorage.setItem('token', Buffer.from(token).toString('base64'));
  localStorage.setItem(
    'expireTime',
    Buffer.from((Date.now() + parseInt(expireTime) * 1000).toString()).toString('base64')
  );
  close();
</script>
