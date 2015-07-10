class QuotesController < ApplicationController
	def index
		@quotes = Quote.all
	end

	def new
		@quote = Quote.new
	end

	def create
		@quote = Quote.create(quote_params)
		redirect_to @quote
	end

	def show
		@quote = Quote.find(params[:id])
	end

	def destroy
		quote = Quote.find(params[:id])
    quote.destroy
    redirect_to index
  end

	private
    
    def quote_params
      params.require(:quote).permit( :movie, :character, :txt, :img)
    end

end

