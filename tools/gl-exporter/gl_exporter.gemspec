# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'gl_exporter/version'

Gem::Specification.new do |spec|
  spec.name          = "gl_exporter"
  spec.version       = GlExporter::VERSION
  spec.authors       = ["GitHub", "Kyle Macey"]
  spec.email         = ["opensource+gl-exporter@github.com", "services@github.com"]

  spec.summary       = %q{A ruby utility for exporting GitLab repositories to be imported by ghe-migrator}
  spec.description   = %q{A ruby utility for exporting GitLab repositories to be imported by ghe-migrator}
  spec.homepage      = "https://github.com/github/gl-exporter"

  spec.files         = %w(CODE_OF_CONDUCT.md CONTRIBUTING.md LICENSE README.md Rakefile gl_exporter.gemspec)
  spec.files         += Dir.glob("{bin,exe,lib,script}/**/*")
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
  spec.required_ruby_version = "~> 2.4"

  spec.add_dependency "activesupport", "~> 4.2.6"
  spec.add_dependency "faraday", "~> 0.13"
  spec.add_dependency "faraday-http-cache", "~> 1.2.2"
  spec.add_dependency "faraday_middleware", "~> 0.10.0"
  spec.add_dependency "posix-spawn", "~> 0.3.0"
  spec.add_dependency "dotenv", "~> 2.1.1"
  spec.add_dependency "rugged", "~> 0.28.3.1"
  spec.add_development_dependency "bundler", ">=1.3.0"
  spec.add_development_dependency "climate_control", "~> 0.1.0"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "yard", "~> 0.9.11"
  spec.add_development_dependency "redcarpet"
  spec.add_development_dependency "github-markup"
  spec.add_development_dependency "addressable", "~> 2.8.0"
end
