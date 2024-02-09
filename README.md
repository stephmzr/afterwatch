# Préambule

- Remplacer toutes les occurences de my_application par le nom de l'app en snake case
- Remplacer toutes les occurences de my-application par le nom de l'app en hyphen case
- Remplacer toutes les occurences de MyApplication par le nom de l'app en camel case
- Remplacer le fichier my_application_schema.rb par nom d'app _schema.rb
- Donner un vrai nom a l'application dans le fichier appsignal.yml

# Utilisation

```bash
./init.sh (seulement la première fois)
./start.sh
```

# Commit

Les commits doivent suivre le standard conventional commit dont la documentation est disponible ici :

https://www.conventionalcommits.org/en/v1.0.0/

# Scaffold des types / mutations / query graphql

```bash
bundle exec rails generate ntq_tools:graphql_scaffold ModelName
```

# Alias pour importer les fichiers sass ou images

```
@import "@styles/variables"
ou
import logo from '@images/logo.svg"
```