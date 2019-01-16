import router from '@/router'
import { store } from '@/store'
import http from '@/services/httpToken'

export default {
  isLogged() {
    return !!this.getCookie('gstoken')
  },
  checkIsLogged() {
    if (!this.isLogged())
      this.logout()
  },
  setToken(response, longToken = false) {
    this.logoutWithoutRedirect()
    this.saveToken(response.data.token, longToken)
    this.fetchData()
  },
  changeToken(token) {
    this.logoutWithoutRedirect()
    this.saveToken(token)
    this.fetchData(false)
  },
  saveToken(token, longToken = false) {
    const day = 24 * 60 * 60 * 1000
    const numDays = 15
    const date = longToken ? new Date(new Date().getTime() + numDays * day).toUTCString() : new Date(new Date().getTime() + day).toUTCString()
    document.cookie = `gstoken=Bearer ${token}; path=/; expires=${date};`
  },
  fetchData(redirect = true) {
    this.setUserInfo(redirect)
    this.setClinics()
  },
  setUserInfo(redirect = false) {
    store.dispatch('actionSetUserLoading', true)
    store.dispatch('actionSetLogged', this.isLogged())
    http.get('users/info').then(data => {
      this.addAuthoritiesLocalStorage(data)
      store.dispatch('actionSetUserInfo', data)
      if (redirect) {
        if (gm.hasRole('ROLE_SYSTEM_ADMIN'))
          router.push('/super-dashboard')
        else
          router.push('/dashboard')
      }
      store.dispatch('actionSetUserLoading', false)
    }).catch(() => {
      this.logout()
      store.dispatch('actionSetUserLoading', false)
    })
  },
  setClinics() {
    store.dispatch('actionSetClinicsLoading', true)
    http.get('/clinics').then(data => {
      store.dispatch('actionSetClinics', data)
      this.getTenant(data)
      store.dispatch('actionSetClinicsLoading', false)
    }).catch(() => {
      this.logout()
      store.dispatch('actionSetClinicsLoading', false)
    })
  },
  addAuthoritiesLocalStorage(data) {
    if (data && data.authorities && data.authorities.length > 0) {
      localStorage.setItem('authorities', JSON.stringify(data.authorities))
    } else {
      localStorage.removeItem('authorities')
    }
  },
  getTenant(data) {
    const localTenant = localStorage.getItem('tenant')
    const tenant = parseInt(localTenant)
    if (tenant) {
      store.dispatch('actionSetTenant', tenant)
    } else {
      store.dispatch('actionSetTenant', data[0].id)
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
    var value = "; " + document.cookie
    var parts = value.split("; " + name + "=")
    if (parts.length == 2) return parts.pop().split(";").shift()
    return undefined
  },
  forgetUser() {
    const date = new Date(0).toUTCString()
    document.cookie = `gstoken=; path=/; expires=${date}`
    store.dispatch('actionSetLogged', false)
    store.dispatch('actionSetUserInfo', null)
    store.dispatch('actionSetTenant', null)
  },
  clearVuex() {
    store.dispatch('actionSetClinics', [])
  },
  logoutWithoutRedirect() {
    this.forgetUser()
    this.clearVuex()
    localStorage.clear()
  },
  logout() {
    this.logoutWithoutRedirect()
    router.push('/')
  }
}
