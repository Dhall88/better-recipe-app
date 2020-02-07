class WelcomeController < ApplicationController
  def index
    render json: { status:200, message: "Recipe App"}
  end
end
