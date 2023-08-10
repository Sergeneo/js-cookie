const Cookies = {
	get: function(key) {
		if (!key) {
			let cookies = document.cookie ? document.cookie.split('; ') : [];
      let array = {};
      for (let i = 0; i < cookies.length; i++) {
        let parts = cookies[i].split('=');
        let value = parts.slice(1).join('=');
        try {
          let found = decodeURIComponent(parts[0]);
					try {
						value = JSON.parse(value);
					} catch (e) {
						value = value ? value : undefined;
					}
          array[found] = value;
        } catch (e) {}
      }
			return array;
		}
		let result = document.cookie.match('(^|;)\\s*'+ key +'\\s*=\\s*([^;]+)');
		if (result) {
			let value = result.pop();
			try {
				value = JSON.parse(value);
			} catch (e) {
				value = value ? value : undefined;
			}
			return value;
		}
	},
	set: function(key, value = '', expires = 999) {
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}
		let now = new Date();
		now.setTime(now.getTime() + (expires * 24 * 60 * 60 * 1000));
		document.cookie = `${key}=${value};expires=${now.toUTCString()};path=/`;
	},
	remove: function(key) {
		this.set(key, '', -1);
	}
}