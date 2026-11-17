# ==============================================================================
# TIPOS DE DADOS E VARIÁVEIS NA PROGRAMAÇÃO (PYTHON)
# Script de Demonstração e Verificação - Engenharia de Software
# ==============================================================================

# 1. Declaração de variáveis primitivas (Exemplo de Cadastro):
nome = "Pedro"         # str  (String / Texto)
idade = 18             # int  (Inteiro)
altura = 1.70          # float(Ponto Flutuante / Decimal)
estudante = True       # bool (Booleano)

# 2. Operação matemática direta:
soma = 10 + 5

# 3. Alteração de valor de variável (tipagem dinâmica e reatribuição):
idade = 19

# 4. Impressões no console com formatação e inspeção de tipos:
print(f"Nome: {nome} | Tipo: {type(nome).__name__}")
print(f"Idade atualizada: {idade} | Tipo: {type(idade).__name__}")
print(f"Altura: {altura} | Tipo: {type(altura).__name__}")
print(f"Estudante: {estudante} | Tipo: {type(estudante).__name__}")
print(f"10 + 5 = {soma}")

# 5. Demonstração de Tipos Compostos:
notas = [10, 20, 30]                              # list (Vetor)
aluno = {"nome": nome, "idade": idade}            # dict (Dicionário / Hash Map)
coordenadas = (10.15, -48.33)                     # tuple (Tupla Imutável)

print("\n--- Estruturas Compostas ---")
print(f"Notas: {notas} | Tipo: {type(notas).__name__}")
print(f"Dicionário Aluno: {aluno} | Tipo: {type(aluno).__name__}")
print(f"Coordenadas: {coordenadas} | Tipo: {type(coordenadas).__name__}")
