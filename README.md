# FinApi - Financeia

### Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [o] Deve ser possível realizar um depósito
- [o] Deve ser possível realizar um saque
- [o] Deve ser possível buscar o extrato bancário do cliente por data
- [o] Deve ser possível atualizar dados da conta do cliente
- [o] Deve ser possível obter dados da conta do cliente
- [o] Deve ser possível deletar uma conta
- [o] Deve ser possível retornar o balanço

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já exístente
- [x] Não deve ser possível buscar extrato em uma conta não exístente
- [o] Não deve ser possível fazer depósito em uma conta não exístente
- [o] Não deve ser possível fazer saque em uma conta não exístente
- [o] Não deve ser possível fazer saque quando o saldo for insuficiente
- [o] Não deve ser possível excluir uma conta não existente