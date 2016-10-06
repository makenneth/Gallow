package csrf

import (
  "net/http"
  "../token"
  "time"
)

var csrfs map[string]string;

func SetCSRF(w http.ResponseWriter, r *http.Request) string {
  var pid string
  if csrfs == nil {
    csrfs = make(map[string]string)
  }
  expiration := time.Now().Add(time.Hour)
  csrfToken, _ := token.GenerateRandomToken(32)
  cookie, _ := r.Cookie("pid")

  if cookie.String() == "" {
    pid, _ = token.GenerateRandomToken(32)
    cookie := &http.Cookie{Name: "pid", Value: pid, Expires: expiration, Path: "/"}
    http.SetCookie(w, cookie)
  } else {
    pid = cookie.Value;
  }
  csrfs[pid] = csrfToken
  return csrfToken
}


func CheckCSRF(r *http.Request) bool {
  if csrfs == nil {
    return false
  }
  pId, _ := r.Cookie("pid")

  if pId.String() != "" {
    if c, ok := csrfs[pId.Value]; ok {
      t := r.Header.Get("X-CSRF-TOKEN")
      return t == c
    }
  }

  return false
}