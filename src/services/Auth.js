export default {
  isLogged() {
    return !!this.getCookie('gstoken')
  },
  saveToken(token, longToken = false) {
    const day = 24 * 60 * 60 * 1000
    const numDays = 15
    const date = longToken ? new Date(new Date().getTime() + numDays * day).toUTCString() : new Date(new Date().getTime() + day).toUTCString()
    document.cookie = `gstoken=Bearer ${token}; path=/; expires=${date};`
  },
  getTenant(data) {
    const localTenant = localStorage.getItem('tenant')
    const tenant = parseInt(localTenant)
    if (tenant) {
    } else {
      localStorage.setItem('tenant', data[0].id)
    }
  },
  getToken() {
    let token = this.getCookie('gstoken')
    if (token) {
      return token
    } else {
      this.logout()
    }
  },
  getCookie(name) {
    let value = "; " + document.cookie
    let parts = value.split("; " + name + "=")
    if (parts.length === 2) return parts.pop().split(";").shift()
    return undefined
  },
  forgetUser() {
    const date = new Date(0).toUTCString()
    document.cookie = `gstoken=; path=/; expires=${date}`
  },
  logout() {
    this.forgetUser()
  }
}
