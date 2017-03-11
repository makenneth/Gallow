package requestError
import (
  "encoding/json"
  "net/http"
)

type error struct {
  message string `json:"message"`
}

func SendErrorResponse(w http.ResponseWriter, code int, message string) {
  w.WriteHeader(code)
  w.Header().Set("Content-Type", "application/json")
  res, _ := json.Marshal(&error{message})
  w.Write(res)
}
