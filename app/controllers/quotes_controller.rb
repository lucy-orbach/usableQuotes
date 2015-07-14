class QuotesController < ApplicationController
	def index
		@quotes = Quote.all
		respond_to do |format|
  		format.html # index.html.erb
  		format.json { render json: @quotes }
		end
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
    respond_to do |format|
      format.html { redirect_to index }
      format.json { head :no_content }
    end
  end

  

	private
    
    def quote_params
      params.require(:quote).permit( :movie, :character, :txt, :img)
    end

end

