# frozen_string_literal: true

class UserImporter < NtqExcelsior::Importer
  model_klass User

  primary_key :id

  schema({
           email: 'Email',
           first_name: /Prénom/i,
           last_name: {
             header: /Nom/i,
             required: true
           },
           active: {
             header: /Actif/i,
             required: false
           }
         })

  def import_line(_line, save: true)
    super do |record, line|
      record.email = line[:email]
      record.first_name = line[:first_name]
      record.last_name = line[:last_name]
      password = SecureRandom.hex(20)
      record.password = password
      record.password_confirmation = password
    end
  end
end
