require 'faker'

puts 'Supprimer et recréer les utilisateurs ? (y/n)'

input = $stdin.gets.strip
if input == 'y'
  ['support@9troisquarts.com'].each do |email|
    c = User.new
    c.first_name = Faker::Name.first_name
    c.last_name = Faker::Name.last_name
    c.email = email
    c.password = 'temp1234'
    c.password_confirmation = 'temp1234'
    c.save!
  end
  30.times do |i|
    c = User.new
    c.first_name = Faker::Name.first_name
    c.last_name = Faker::Name.last_name
    c.email = Faker::Internet.email
    c.password = 'temp123'
    c.password_confirmation = 'temp123'
    c.save!
  end
end