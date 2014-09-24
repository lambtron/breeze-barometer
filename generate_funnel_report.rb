#!/usr/bin/env ruby

require 'rubygems'
require 'json'
require 'pp'

file = ARGV[0]

f = File.open(file, "r")

arr = ''

f.each_line do |line|
  arr = JSON.parse(line)
  funnel = {}
  arr.each do |user|
    # pp user

    neighborhood = user['neighborhood']
    unless neighborhood.nil?
      neighborhood = neighborhood.gsub(/[^0-9a-z ]/i, '').tr(" ", "_")
    else
      neighborhood = 'NA'
    end
    current_stage = user['current_stage']

    if funnel.key?(neighborhood)
      if funnel[neighborhood].key?(current_stage)
        funnel[neighborhood][current_stage] += 1
      else
        funnel[neighborhood][current_stage] = 0
      end
    else
      funnel[neighborhood] = {}
    end
  end

  pp funnel
end