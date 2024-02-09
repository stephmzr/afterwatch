# frozen_string_literal: true

module Types
  module CustomScalars
    class FileType < Types::BaseScalar
      description 'A file url, transported as a string'
      def self.coerce_input(file, _context)
        return nil if file.blank?

        ActionDispatch::Http::UploadedFile.new(
          filename: file.original_filename,
          type: file.content_type,
          headers: file.headers,
          tempfile: file.tempfile
        )
      end

      def self.coerce_result(_value, _context)
        {}
      end
    end
  end
end
