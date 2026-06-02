package tacos.web;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Ingredient {
	
	@Id
	private final String id;
	private final String name;
	private final Type type;
	
	public enum Type {
		WRAP, PROTEIN, VEGGIES, CHEES, SAUCE
	}

	

}
