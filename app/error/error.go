package error
import (
  "encoding/json"
)

type error struct {
  message `json:"message"`
}

func SendErrorResponse(w http.ResponseWriter, code int, message string) {
  w.WriteHeader(code)
  w.Header().Set("Content-Type", "application/json")
  res, _ := json.Marshal(&error{message})
  w.Write(res)
}
